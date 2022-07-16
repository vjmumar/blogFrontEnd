// Type
export const DRAFT_STORIES_TYPE = "DRAFT_STORIES_TYPE";
export const PUBLISHED_STORIES_TYPE = "PUBLISHED_STORIES_TYPE";
export const BOOKMARKED_STORIES_TYPE = "BOOKMARKED_STORIES_TYPE";
// Params
export const DRAFT_STORIES_PARAMS = "draft-stories";
export const BOOKMARKED_STORIES_PARAMS = "bookmarked-stories";
export const PUBLISHED_STORIES_PARAMS = "published-stories";

// Filter
export const selectOptions = [
	{ value: "latest", label: "Latest" },
	{ value: "old", label: "Old" },
];

// React Select Style
export const customStyles = {
	control: (base) => ({
		...base,
		height: "100%",
		width: "100%",
		minWidth: "100%",
		margin: "0px !important",
		borderRadius: "0px",
		borderColor: "black",
		"@media (max-width: 768px)": {
			minWidth: "100%"
		}
		
	}),
};
