import { useEffect } from "react";

const useComponentDidUnMount = (cb) => {
	useEffect(() => {
		return cb;
	}, []);
};

export default useComponentDidUnMount;
