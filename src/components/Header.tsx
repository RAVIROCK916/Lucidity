import { changeCredentials } from "@/state/slices/adminSlice";
import { Divider, Switch } from "antd";
import { MdLogout } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";

const Header = () => {
	const isAdmin = useSelector(
		(state: {
			admin: {
				isAdmin: boolean;
			};
		}) => state.admin.isAdmin
	);
	const dispatch = useDispatch();

	return (
		<div className="flex justify-end items-center gap-2 space-x-4">
			<div className="flex items-center gap-2">
				Admin
				<Switch
					checked={!isAdmin}
					className="bg-neutral-700 hover:bg-neutral-700"
					onClick={() => dispatch(changeCredentials())}
				/>
				User
			</div>
			<Divider type="vertical" className="bg-neutral-300 w-[2px] h-6" />
			<MdLogout className="text-2xl text-neutral-300" />
		</div>
	);
};
export default Header;
