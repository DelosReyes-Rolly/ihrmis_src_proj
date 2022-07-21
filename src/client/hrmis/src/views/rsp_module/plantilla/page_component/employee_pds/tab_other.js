import React, { useState } from "react";
import { BsPencilFill } from "react-icons/bs";
import ButtonComponent from "../../../../common/button_component/button_component.js";
import OtherHobbyModal from "./other_tab_modal.js";

const OtherTab = () => {
	const [otherHobbies] = useState({
		skill: [],
		recognition: [],
		organization: [],
	});

	const [otherHobbiesModal, setOtherHobbiesModal] = useState({
		skill: false,
		recognition: false,
		organization: false,
	});

	return (
		<React.Fragment>
			<OtherHobbyModal
				hobbyType="SKILL"
				title="SPECIAL SKILLS AND HOBBIES"
				isDisplay={otherHobbiesModal?.skill}
				onClose={() =>
					setOtherHobbiesModal({ ...otherHobbiesModal, skill: false })
				}
				// reference={otherHobbies.skill}
			/>

			<OtherHobbyModal
				hobbyType="RECOG"
				title="NON-ACADEMIC DISTINCTION/RECOGNITION"
				isDisplay={otherHobbiesModal?.recognition}
				onClose={() =>
					setOtherHobbiesModal({ ...otherHobbiesModal, recognition: false })
				}
				// reference={otherHobbies.recognition}
			/>

			<OtherHobbyModal
				hobbyType="MEMBR"
				title="MEMBERSHIP IN ASSOCIATION/ORGANIZATION"
				isDisplay={otherHobbiesModal?.organization}
				onClose={() =>
					setOtherHobbiesModal({ ...otherHobbiesModal, organization: false })
				}
				// reference={otherHobbies.organization}
			/>

			<div
				style={{ display: "flex", flexDirection: "row", margin: "20px 0px" }}
			>
				<div style={{ flexGrow: 1 }}>
					<div className="default-table" style={{ margin: "0px" }}>
						<table>
							<thead>
								<tr className="secondary-headers-20">
									<th>SPECIAL SKILLS AND HOBBIES</th>
								</tr>
							</thead>
							<tbody>
								{otherHobbies?.skill?.map((element) => {
									return <td>{element?.oth_emp_desc}</td>;
								})}
								<tr></tr>
							</tbody>
						</table>
					</div>
					<AddButton
						onClick={() =>
							setOtherHobbiesModal({ ...otherHobbiesModal, skill: true })
						}
					/>
				</div>
				<div style={{ flexGrow: 1 }}>
					<div className="default-table" style={{ margin: "0px" }}>
						<table>
							<thead>
								<tr className="secondary-headers-20">
									<th>NON-ACADEMIC DISTINCTION/RECOGNITION</th>
								</tr>
							</thead>
							<tbody>
								{otherHobbies?.organization?.map((element) => {
									return <td>{element?.oth_emp_desc}</td>;
								})}
							</tbody>
						</table>
					</div>
					<AddButton
						onClick={() =>
							setOtherHobbiesModal({ ...otherHobbiesModal, recognition: true })
						}
					/>
				</div>
				<div style={{ flexGrow: 1 }}>
					<div className="default-table" style={{ margin: "0px" }}>
						<table>
							<thead>
								<tr className="secondary-headers-20">
									<th>MEMBERSHIP IN ASSOCIATION/ORGANIZATION</th>
								</tr>
							</thead>
							<tbody>
								{otherHobbies?.recognition?.map((element) => {
									return <td>{element?.oth_emp_desc}</td>;
								})}
							</tbody>
						</table>
					</div>
					<AddButton
						onClick={() =>
							setOtherHobbiesModal({ ...otherHobbiesModal, organization: true })
						}
					/>
				</div>
			</div>

			<div style={{ marginTop: "20px", marginBottom: "70px" }}>
				<div className="default-table" style={{ margin: "0px" }}>
					<table className="table-design">
						<thead>
							<tr className="secondary-headers-20">
								<th colSpan="4">OTHER INFORMATION</th>
							</tr>
						</thead>
						<tbody>
							<tr style={{ backgroundColor: "#00000007" }}>
								<td colSpan="4">
									1. Are you related by consanguinity or affinity to the
									appointing or recommending authority, or to the chief of
									bureau or office or to the person who was immediate
									supervision over you in the Office, Bureau or Department where
									you will be appointed?
								</td>
							</tr>
							<tr>
								<td style={{ backgroundColor: "#00000007" }} colSpan="2">
									1.a within the third degree?
								</td>
								<td style={{ minWidth: "30%" }} colSpan="2">
									<SelectorRadio value={0} />
								</td>
							</tr>
							<tr>
								<td style={{ backgroundColor: "#00000007" }} colSpan="2">
									1.b within the fourth degree (for Local Government Unit -
									Career Employee)?
								</td>
								<td colSpan="2">
									<SelectorRadio value={0} />
								</td>
							</tr>
							<tr>
								<td style={{ backgroundColor: "#00000007" }} colSpan="2">
									Details
								</td>
								<td colSpan="2"></td>
							</tr>
							<tr>
								<td style={{ backgroundColor: "#00000007" }} colSpan="2">
									2.a Have you ever been found guilty of any administrative
									offense?
								</td>
								<td colSpan="2">
									<SelectorRadio value={0} />
								</td>
							</tr>
							<tr>
								<td style={{ backgroundColor: "#00000007" }} colSpan="2">
									Details
								</td>
								<td colSpan="2"></td>
							</tr>
							<tr>
								<td style={{ backgroundColor: "#00000007" }} colSpan="2">
									2.b Have you been criminally charged before any court?
								</td>
								<td colSpan="2">
									<SelectorRadio value={0} />
								</td>
							</tr>
							<tr>
								<td style={{ backgroundColor: "#00000007" }}>Date Filled</td>
								<td></td>
								<td style={{ backgroundColor: "#00000007" }}>
									Status of Case/s
								</td>
								<td></td>
							</tr>
							<tr>
								<td style={{ backgroundColor: "#00000007" }} colSpan="2">
									3. Have ever been convicted of any crime or violation of any
									law, decree ordinance or regulation by any court or tribunal.
								</td>
								<td colSpan="2">
									<SelectorRadio value={0} />
								</td>
							</tr>
							<tr>
								<td style={{ backgroundColor: "#00000007" }} colSpan="2">
									Details
								</td>
								<td colSpan="2"></td>
							</tr>
							<tr>
								<td style={{ backgroundColor: "#00000007" }} colSpan="2">
									4. Have you ever been seperated from the service in any of the
									following modes: resignation, retirement, dropped from the
									rolls, dismissal, termination, end of term, finished contract
									or phased sout (abolition), in public or private sector?
								</td>
								<td colSpan="2">
									<SelectorRadio value={0} />
								</td>
							</tr>
							<tr>
								<td style={{ backgroundColor: "#00000007" }} colSpan="2">
									Details
								</td>
								<td colSpan="2"></td>
							</tr>
							<tr>
								<td style={{ backgroundColor: "#00000007" }} colSpan="2">
									5.a Have you ever been a candidate in a national or local
									election held within the last year. (except Barangay
									election)?
								</td>
								<td colSpan="2">
									<SelectorRadio value={0} />
								</td>
							</tr>
							<tr>
								<td style={{ backgroundColor: "#00000007" }} colSpan="2">
									Detail
								</td>
								<td colSpan="2"></td>
							</tr>
							<tr>
								<td style={{ backgroundColor: "#00000007" }} colSpan="2">
									5.a Have you resigned from the government service during the
									three (3)-month period before the las election to
									promote/actively campaign for a national or local candidate?
								</td>
								<td colSpan="2">
									<SelectorRadio value={0} />
								</td>
							</tr>
							<tr>
								<td style={{ backgroundColor: "#00000007" }} colSpan="2">
									Details
								</td>
								<td colSpan="2"></td>
							</tr>
							<tr>
								<td style={{ backgroundColor: "#00000007" }} colSpan="2">
									6 Have you acquird status of an immigrant or permanent
									resident of another country?
								</td>
								<td colSpan="2">
									<SelectorRadio value={0} />
								</td>
							</tr>
							<tr>
								<td style={{ backgroundColor: "#00000007" }} colSpan="2">
									Details (Country)
								</td>
								<td colSpan="2"></td>
							</tr>
							<tr>
								<td style={{ backgroundColor: "#00000007" }} colSpan="4">
									7. Pursuant to: (a) Indigenous People's Act (RA 8371); (b)
									Magna Carta for Disable Persons (RA 7277); and (c) Solo
									Parents Welfare Act of 2000 (RA 8972), please answer the
									fallowing items:
								</td>
							</tr>
							<tr>
								<td style={{ backgroundColor: "#00000007" }} colSpan="2">
									7.a Are you a member of indigenous group?
								</td>
								<td colSpan="2">
									<SelectorRadio value={0} />
								</td>
							</tr>
							<tr>
								<td style={{ backgroundColor: "#00000007" }} colSpan="2">
									Details
								</td>
								<td colSpan="2"></td>
							</tr>
							<tr>
								<td style={{ backgroundColor: "#00000007" }} colSpan="2">
									7.b Are you a person with disability?
								</td>
								<td colSpan="2">
									<SelectorRadio value={0} />
								</td>
							</tr>
							<tr>
								<td style={{ backgroundColor: "#00000007" }} colSpan="2">
									Details
								</td>
								<td colSpan="2"></td>
							</tr>
							<tr>
								<td style={{ backgroundColor: "#00000007" }} colSpan="2">
									7.c Are you a solo parent?
								</td>
								<td colSpan="2">
									<SelectorRadio value={0} />
								</td>
							</tr>
							<tr>
								<td style={{ backgroundColor: "#00000007" }} colSpan="2">
									Details
								</td>
								<td colSpan="2"></td>
							</tr>
						</tbody>
					</table>
				</div>
				<AddButton />
			</div>
		</React.Fragment>
	);
};

export default OtherTab;

const AddButton = ({ onClick }) => {
	return (
		<div
			style={{
				display: "flex",
				flexDirection: "row",
				justifyContent: "end",
				marginTop: "7px",
			}}
		>
			<ButtonComponent
				onClick={onClick}
				buttonName="Edit"
				buttonLogoStart={<BsPencilFill />}
			/>
		</div>
	);
};

const SelectorRadio = ({ name = "name", value = 1 }) => {
	return (
		<div
			style={{
				display: "flex",
				flexDirection: "row",
				justifyContent: "space-evenly",
			}}
		>
			<div
				style={{
					display: "flex",
					gap: 10,
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				<input
					type="radio"
					checked={value === 1}
					name={name}
					readOnly={true}
					value={1}
				/>
				<label>Yes</label>
			</div>
			<div
				style={{
					display: "flex",
					gap: 10,
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				<input
					type="radio"
					name={name}
					checked={value === 0}
					readOnly={true}
					value={0}
				/>
				<label>No</label>
			</div>
		</div>
	);
};
