import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import formatNumber from "@/utils/formatNumber";
import { MdDelete, MdModeEdit, MdRemoveRedEye } from "react-icons/md";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useState } from "react";
import { message } from "antd";
import { useSelector } from "react-redux";

const Products = ({
	productsList,
}: {
	productsList: {
		id: number;
		Name: string;
		Category: string;
		Price: number;
		Quantity: number;
		Value: number;
	}[];
}) => {
	const [products, setProducts] = useState(productsList);
	const [inputProduct, setInputProduct] = useState({
		Category: "",
		Price: 0,
		Quantity: 0,
		Value: 0,
	});

	const isAdmin = useSelector(
		(state: {
			admin: {
				isAdmin: boolean;
			};
		}) => state.admin.isAdmin
	);

	const editProduct = (id: number) => {
		setInputProduct(() => {
			const product = products.find((p) => p.id === id);
			if (!product) {
				throw new Error("Product not found");
			}

			return {
				Category: product.Category,
				Price: product.Price,
				Quantity: product.Quantity,
				Value: product.Value,
			};
		});
	};

	const disableProduct = () => {
		console.log("disabled");
	};

	const deleteProduct = (id: number) => {
		setProducts(products.filter((p) => p.id !== id));
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInputProduct({ ...inputProduct, [e.target.name]: e.target.value });
	};

	const saveProduct = (id: number) => {
		setProducts(
			products.map((p) => {
				if (p.id === id) {
					message.success("Product saved");
					return {
						...p,
						...inputProduct,
					};
				}
				return p;
			})
		);
	};

	return (
		<div>
			<Table>
				<TableHeader>
					<TableRow>
						{Object.keys(products?.[0]).map((productTitle) => (
							<TableHead key={productTitle}>{productTitle}</TableHead>
						))}
						<TableHead>Action</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{products.map((product, idx) => (
						<TableRow key={idx + 1}>
							<TableCell>{idx + 1}</TableCell>
							<TableCell>{product.Name}</TableCell>
							<TableCell>{product.Category}</TableCell>
							<TableCell>{"$" + formatNumber(product.Price)}</TableCell>
							<TableCell>{product.Quantity}</TableCell>
							<TableCell>{"$" + formatNumber(product.Value)}</TableCell>
							<TableCell className="flex gap-3 [&>*]:text-base [&>*]:cursor-pointer">
								<Dialog>
									<DialogTrigger asChild>
										<Button
											disabled={!isAdmin}
											className="bg-transparent p-1 text-neutral-950 hover:bg-neutral-900 hover:text-neutral-50"
										>
											<MdModeEdit onClick={() => editProduct(product.id)} />
										</Button>
									</DialogTrigger>
									<DialogContent className="gap-2 sm:max-w-[550px]">
										<DialogHeader>
                      <DialogTitle className="text-2xl">{product.Name}</DialogTitle>
										</DialogHeader>
										<div className="grid grid-cols-2 gap-4 py-4 [&>*]:flex [&>*]:flex-col [&>*]:gap-1">
											<div>
												<Label
													htmlFor="category"
													className="text-xs text-neutral-600"
												>
													Category
												</Label>
												<Input
													id="category"
													defaultValue="Pedro Duarte"
													className="col-span-3"
													name="Category"
													value={inputProduct.Category}
													onChange={handleChange}
												/>
											</div>
											<div>
												<Label
													htmlFor="price"
													className="text-xs text-neutral-600"
												>
													Price
												</Label>
												<Input
													id="price"
													defaultValue="@peduarte"
													type="number"
													className="col-span-3"
													name="Price"
													value={inputProduct.Price}
													onChange={handleChange}
												/>
											</div>
											<div>
												<Label
													htmlFor="quantity"
													className="text-xs text-neutral-600"
												>
													Quantity
												</Label>
												<Input
													id="quantity"
													type="number"
													className="col-span-3"
													name="Quantity"
													value={inputProduct.Quantity}
													onChange={handleChange}
												/>
											</div>
											<div>
												<Label
													htmlFor="value"
													className="text-xs text-neutral-600"
												>
													Value
												</Label>
												<Input
													id="value"
													defaultValue="@peduarte"
													type="number"
													className="col-span-3"
													name="Value"
													value={inputProduct.Value}
													onChange={handleChange}
												/>
											</div>
										</div>
										<DialogFooter>
											<DialogClose asChild>
												<Button
													type="submit"
													onClick={() => saveProduct(product.id)}
												>
													Save changes
												</Button>
											</DialogClose>
										</DialogFooter>
									</DialogContent>
								</Dialog>
								<Button
									disabled={!isAdmin}
									className="bg-transparent p-1 text-neutral-950 hover:bg-neutral-900 hover:text-neutral-50"
								>
									<MdRemoveRedEye onClick={disableProduct} aria-disabled />
								</Button>
								<Button
									disabled={!isAdmin}
									className="bg-transparent p-1 text-neutral-950 hover:bg-neutral-900 hover:text-neutral-50"
								>
									<MdDelete
										onClick={() => deleteProduct(product.id)}
										aria-disabled={true}
									/>
								</Button>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
};
export default Products;
