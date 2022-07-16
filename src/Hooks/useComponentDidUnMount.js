/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";

const useComponentDidUnMount = (cb) => {
	useEffect(() => {
		return cb;
	}, []);
};

export default useComponentDidUnMount;
