import React from "react";

import Select from "react-select";

const MultiSelect = ({ options, name, className, prefix }) => {
	return (
		<Select
			isMulti
			name={name}
			options={options}
			className={className}
			classNamePrefix={prefix}
		/>
	);
};

export default MultiSelect;
