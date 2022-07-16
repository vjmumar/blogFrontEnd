import { useEffect } from "react";

export const useComponentDidMount = (cb) => {
	useEffect(() => {
		cb();
	}, []);
};
