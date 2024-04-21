import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MdShoppingCart } from "react-icons/md";
import Products from "./Products";
import { useState } from "react";
import formatNumber from "@/utils/formatNumber";
import data from "../data.json"

const Inventory = () => {
	const iconSize = 24;
	const [productsList, setProductsList] = useState(data.products);

	const [totalProducts, setTotalProducts] = useState(productsList.length);
	const [totalStoreValue, setTotalStoreValue] = useState(
		productsList.reduce((total, product) => total + product.Value, 0)
	);
	const [outOfStock, setOutOfStock] = useState(
		productsList.reduce(
			(total, product) => (product.Quantity === 0 ? total + 1 : total),
			0
		)
	);
	const [noOfCategory, setNoOfCategory] = useState(() => {
		const categories = new Set(productsList.map((product) => product.Category));
		return categories.size;
	});

	const dataStats = [
		{
			title: "Total Products",
			value: totalProducts,
			icon: <MdShoppingCart size={iconSize} />,
		},
		{
			title: "Total store value",
			value: "$" + formatNumber(totalStoreValue),
			icon: <MdShoppingCart size={iconSize} />,
		},
		{
			title: "Out of stock",
			value: outOfStock,
			icon: <MdShoppingCart size={iconSize} />,
		},
		{
			title: "No of Category",
			value: noOfCategory,
			icon: <MdShoppingCart size={iconSize} />,
		},
	];

	return (
		<div>
			<h1>Inventory Stats</h1>
			<div className="flex gap-4 my-6">
				{dataStats?.map((stat, index) => (
					<Card key={index + 1} className="flex-1 bg-neutral-50">
						<CardHeader className="flex flex-row gap-2 pb-2">
							{stat.icon}
							<CardTitle className="text-sm !mt-0">{stat.title}</CardTitle>
						</CardHeader>
						<CardContent>
							<p className="text-4xl font-bold">{stat.value}</p>
						</CardContent>
					</Card>
				))}
			</div>
			<Products productsList={productsList} />
		</div>
	);
};
export default Inventory;
