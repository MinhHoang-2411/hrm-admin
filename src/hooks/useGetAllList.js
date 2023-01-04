import {useAppDispatch, useAppSelector} from 'app/hooks';
import {useCallback, useEffect} from 'react';

export default function useGetAllList(params, action, nameState) {
  const dispatch = useAppDispatch();
  const {listData, pagination, reloadList, loading} = useAppSelector((state) => state[nameState]);

  const fetchData = useCallback(
    (params) => {
      try {
        const paramsApi = {...params};
        if (paramsApi?.sort_by) {
          paramsApi.sort = `${sort_by},${sort_type}`;
        }
        dispatch(action.fetchData(paramsApi || {}));
      } catch (error) {
        console.error({error});
      }
    },
    [params, reloadList]
  );

  useEffect(() => {
    fetchData(params);
  }, [params, reloadList]);

  return {listData, pagination, loading};
}
