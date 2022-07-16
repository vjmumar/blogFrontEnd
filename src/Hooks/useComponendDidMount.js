 import React,{useEffect} from 'react';

 export const useComponentDidMount = (cb) => {
  useEffect(() => {
    cb();
  }, []);
};
