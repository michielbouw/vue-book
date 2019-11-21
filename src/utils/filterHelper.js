import * as R from 'ramda';

const searchList = q => list => {
  if (!(list.length && q)) {
    return list;
  }

  const value = R.toLower(q);
  return R.filter(
    listItem => listItem.title && R.toLower(listItem.title).indexOf(value) > -1,
    list
  );
};

const filterList = filter => list => {
  if (!(list.length && filter && filter.field && filter.value)) {
    return list;
  }

  return R.filter(R.propEq(filter.field, filter.value), list);
};

const sortList = sort => list => {
  if (!(list.length && sort && sort.field)) {
    return list;
  }

  const sortDirection = dir => (dir === 'desc' ? R.descend : R.ascend);
  return R.sortWith(
    [
      R.compose(
        sortDirection(sort.order),
        R.prop
      )(sort.field),
    ],
    list
  );
};

export { searchList, filterList, sortList };
