// Actions
export const REQUEST_TO_BE_FRIEND = "requestToBeFriend";
export const CANCEL_REQUEST_TO_BE_FRIEND = "cancelRequestToBeFriend";
export const ACCEPT_USER_FRIEND_REQUEST = "acceptUserFriendRequest";
export const REJECT_USER_FRIEND_REQUEST = "rejectUserFriendRequest";
export const UNFRIEND_USER = "unfriendUser";
export const FOLLOW_USER = "follow";
export const UN_FOLLOW_USER = "unfollow";

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
		minWidth: "100%",
		width: "100%",
		margin: "0px !important",
		borderRadius: "0px",
		borderColor: "black",
		"@media (max-width: 768px)": {
			minWidth: "100%"
		},
	}),
};