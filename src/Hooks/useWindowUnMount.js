const useWindowUnMount = (cb) => {
	window.addEventListener("beforeunload", () => cb(), true);
};

export default useWindowUnMount;
