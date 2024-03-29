const STATUS_CANDIDATE = ['NEW', 'PROCESSING', 'PASSED', 'FAILED'];
const STATUS_ASSET = ['Free', 'Being Used', 'Under Repair', 'Broken', 'New'];
const STATUS_LEAVE = ['Approved', 'Rejected', 'Waiting', 'Canceled'];
const TYPE_LEAVE = ['Annual', 'Casual', 'Remote', 'Maternity'];
const STATUS_ASSET_REQUEST = ['Pending', 'Processing', 'Received', 'Rejected', 'Canceled'];
const STATUS_ACCOUNT_USER = [
  {id: 1, name: 'Activated'},
  {id: 2, name: 'Deactivated'},
];
const LIST_AUTHORITIES = [
  {title: 'User', name: 'ROLE_USER'},
  {title: 'Admin', name: 'ROLE_ADMIN'},
];
const TYPE_DETAIL_LEAVE = {
  ALL_DAY: 'All day',
  MORNING: 'Morning',
  AFTERNOON: 'Afternoon',
};

export {
  STATUS_CANDIDATE,
  STATUS_ASSET,
  STATUS_LEAVE,
  TYPE_LEAVE,
  STATUS_ACCOUNT_USER,
  STATUS_ASSET_REQUEST,
  LIST_AUTHORITIES,
  TYPE_DETAIL_LEAVE,
};
