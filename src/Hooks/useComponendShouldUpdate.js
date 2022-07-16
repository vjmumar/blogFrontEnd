import { useEffect } from "react";

export const useComponentShouldUpdate = (cb, args) => {
	useEffect(() => {
		cb();
	}, args);
};
