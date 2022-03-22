/**
 * Print Vacant Positions
 * @author legee
 */

import { API_HOST } from "../../../../../helpers/global/global_config";

export const printVacantPositions = () => {
	window.open(API_HOST + "generate-pdf", "_tab");
};
