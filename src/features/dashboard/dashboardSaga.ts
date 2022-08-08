import { all, call, put, takeLatest } from 'redux-saga/effects';
import orderApi from '../../api/orderApi';
import { ListResponse, Order } from '../../models';
import { dashboardActions } from './dashboardSlice';

function* fetchStatistics() {
  const res: Array<ListResponse<Order>> = yield all([
    call(orderApi.getListByManager, { status: 'order' }),
    call(orderApi.getListByManager, { status: 'transaction' }),
    call(orderApi.getListByManager, { status: 'shipping' }),
    call(orderApi.getListByManager, { status: 'complete', update_date: new Date().toISOString() }),
  ]);

  const statistics = res.map((x) => x.pagination._totalRecords);
  const [orderCount, transactionCount, shippingCount, completeCount] = statistics;
  yield put(
    dashboardActions.setStatistics({ orderCount, transactionCount, shippingCount, completeCount })
  );
}

function* fetchOrder() {
  const { data }: ListResponse<Order> = yield call(orderApi.getListByManager, {
    _page: 1,
    _limit: 5,
    status: 'order',
  });

  yield put(dashboardActions.setOrderList(data));
}

function* fetchTransition() {
  const { data }: ListResponse<Order> = yield call(orderApi.getListByManager, {
    _page: 1,
    _limit: 5,
    status: 'transaction',
    is_confirmed: false,
  });

  yield put(dashboardActions.setTransactionList(data));
}

function* fetchDashboardData() {
  try {
    yield all([fetchStatistics(), fetchOrder(), fetchTransition()]);
    yield put(dashboardActions.fetchDataSuccess());
  } catch (error) {
    yield put(dashboardActions.fetchDataFailure());
  }
}

export default function* dashboardSaga() {
  yield takeLatest(dashboardActions.fetchData.type, fetchDashboardData);
}
