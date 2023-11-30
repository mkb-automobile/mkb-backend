import carDataServices from "../services/carDataServices.js";

const carDataController = {
	getCarData: async () => {
		try {
			const cars = await carDataServices.getCarData();
			return cars;
		} catch (error) {
			console.error("carDataController.getCarData:", error);
			throw new Error("carDataController.getCarData: Server-side error");
		}
	},
};

export default carDataController;
