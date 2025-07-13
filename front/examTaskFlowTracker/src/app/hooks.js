import { useDispatch, useSelector } from 'react-redux';
import { useMemo } from 'react';

export const useAppDispatch = () => useDispatch();
export const useAppSelector = useSelector;
