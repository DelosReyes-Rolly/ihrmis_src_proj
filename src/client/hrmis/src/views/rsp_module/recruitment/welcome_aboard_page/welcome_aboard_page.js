import React from "react";
import dostLogo from "../../../../assets/images/logo.png";
import sikatlogo from "../../../../assets/images/sikat.png";
import scanmo from "../../../../assets/images/SCANMO.CO.png";
import watch from "../../../../assets/images/watch.png";
import wwwlogo from "../../../../assets/images/www.png";
import ytlogo from "../../../../assets/images/ytlogo.png";
import { IoIosSend } from "react-icons/io";
import { HiUserGroup } from "react-icons/hi";
import { TiMessages } from "react-icons/ti";
import { outsiteWebHelper } from "../../../../router/outside_routes";
import {
	ABODIES,
	DOSTWEBSITE,
	RDINSTITUTES,
	REGIONALOFFICES,
	SCANMO,
	SIKAT,
	SPCOUNCILS,
	STSINSTITUTE,
	WATCH,
	YTDOSTV,
} from "./static/dost_attachedagencylinks_data";
import { FaFacebookSquare, FaTwitterSquare } from "react-icons/fa";
import { BsGlobe } from "react-icons/bs";

const WelcomeAboardPage = () => {
	return (
		<React.Fragment>
			<div>
				<AboardFirstPage />
			</div>
			<div>
				<AboardSecondPage />
			</div>
		</React.Fragment>
	);
};

export default WelcomeAboardPage;

const AboardFirstPage = () => {
	return (
		<React.Fragment>
			<div className="aboard_holder">
				<div className="aboard_page_container">
					<div className="header-container">
						<img src={dostLogo} width="50px" height="50px" alt="dost-logo" />
						<p style={{ marginTop: "10px" }}>
							DEPARTMENT OF SCIENCE AND TECHNOLOGY
						</p>
						<span style={{ textAlign: "center" }}>
							General Santos Avenue, Bicutan, Taguig City, Metro Manila 1631
							Philippines
						</span>
						<span style={{ textAlign: "center" }}>
							Tel. No. (02) 8837-2071 to 82
						</span>
						<br />
					</div>
					<div className="body-container" style={{ marginTop: "30px" }}>
						<div>
							<h1
								style={{
									textAlign: "center",
									marginBottom: "20px",
									color: "#004e87",
								}}
							>
								WELCOME ABOARD!
							</h1>
							<p>
								On behalf of all employees and the management, we could like to
								extend our warmest celcome and congratulations!
							</p>
							<br />
							<p>
								We are delighted to have you among us and looking forward to a
								mutually benificial relationship with you. Your skills would be
								of great use to the department and its success. We hope you find
								your new role rewarding and challenging.
							</p>
							<br />
							<p>
								For a start, we encourage you ti familiarize yourself with our
								organization. Below are a few things that will help you out in
								order to have a successful start, and be able to sign into your
								work email and join communication platform
							</p>
						</div>
						<div className="on-click-containers">
							<div className="div-click-container">
								<IoIosSend size={30} color={"#004e87"} />
								<div>
									<p className="container-title">Get started</p>
									<p className="container-content">
										Get a quick tour around the different sections of the
										resource page
									</p>
								</div>
							</div>
							<div className="div-click-container">
								<HiUserGroup size={28} color={"#004e87"} />
								<div>
									<p className="container-title">Join our workforce</p>

									<p className="container-content">
										Fill in form to request for an email and corporate account
									</p>
								</div>
							</div>
							<div className="div-click-container">
								<TiMessages size={28} color={"#004e87"} />
								<div>
									<p className="container-title">Start a converstion</p>
									<p className="container-content">
										If you have any questions, need some help, or just want to
										say hello, you can drop us a message
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="footer-aboard-container">
					<div>
						"We are commited to provide relevant science, technology and
						innovation (STI) services to the general public, government,
						academic and the private sector with the highest standards of
						quality within our capabilities and resources, according to customer
						and all applicable regulatory and statutory requirements, and
						continually improve the effectiveness of our Quality Management
						System (QMS) in order to meet customer satisfaction and
						organizational fullfillment"
					</div>
				</div>
			</div>
		</React.Fragment>
	);
};
const AboardSecondPage = () => {
	const defaultProps = {
		center: {
			lat: 14.490234780697362,
			lng: 121.0490488570856,
		},
		zoom: 15,
	};

	return (
		<React.Fragment>
			<div className="aboard-page-2">
				<div className="page-two-container-body">
					<div className="body-1">
						<div>
							<h3>Regional Offices</h3>
							<ul>
								{REGIONALOFFICES.map((item) => {
									return (
										<li
											onClick={() => outsiteWebHelper(item.link)}
											key={item.id}
										>
											{item.label}
										</li>
									);
								})}
							</ul>
						</div>
						<div className="body-1-div2"></div>
						<div className="body-1-div3"></div>
						<div className="body-1-div4">
							<div>
								<img
									className="zoom-effect"
									src={sikatlogo}
									width="50px"
									height="50px"
									alt="sikat-logo"
									style={{ cursor: "pointer" }}
									onClick={() => outsiteWebHelper(SIKAT)}
								/>
							</div>
							<p
								className="sikat-text-link"
								onClick={() => outsiteWebHelper(SIKAT)}
							>
								Samahan para sa ika-uunlad nga mga Kawani ng Agham at
								Teknolohiya (SIKAT)
							</p>
						</div>
					</div>
					<div className="body-2">
						<div>
							<h3>Sectoral Planning Councils</h3>
							<ul>
								{SPCOUNCILS.map((item) => {
									return (
										<li
											onClick={() => outsiteWebHelper(item.link)}
											key={item.id}
										>
											{item.label}
										</li>
									);
								})}
							</ul>
						</div>
						<div style={{ marginTop: "15px" }}>
							<h3>Research and Development Institutes</h3>
							<ul>
								{RDINSTITUTES.map((item) => {
									return (
										<li
											onClick={() => outsiteWebHelper(item.link)}
											key={item.id}
										>
											{item.label}
										</li>
									);
								})}
							</ul>
						</div>
						<div style={{ marginTop: "15px" }}>
							<h3>Scienctific and Technological Service Institutes</h3>
							<ul>
								{STSINSTITUTE.map((item) => {
									return (
										<li
											onClick={() => outsiteWebHelper(item.link)}
											key={item.id}
										>
											{item.label}
										</li>
									);
								})}
							</ul>
						</div>
						<div style={{ marginTop: "15px" }}>
							<h3>Advisory Bodies</h3>
							<ul>
								{ABODIES.map((item) => {
									return (
										<li
											onClick={() => outsiteWebHelper(item.link)}
											key={item.id}
										>
											{item.label}
										</li>
									);
								})}
							</ul>
						</div>
					</div>
					<div className="body-3">
						<div style={{ width: "100%", height: "50%" }}>
							<DostMapComponent />
						</div>
						<div className="body-3-div2">
							<div className="body-3-div2-div1">
								<div className="no-content"></div>
								<div className="connect-with-us">
									<p>Connect with us:</p>
									<div className="body-3-div2-div1-content">
										<div className="zoom-effect">
											<FaFacebookSquare
												className="zoom-effect"
												size={"38"}
												cursor={"pointer"}
											/>
										</div>
										<div className="zoom-effect">
											<FaTwitterSquare
												className="zoom-effect"
												size={"38"}
												cursor={"pointer"}
											/>
										</div>
										<div className="zoom-effect">
											<img
												src={watch}
												alt="dostv-logo"
												width="34px"
												height="34px"
												style={{ cursor: "pointer" }}
												onClick={() => outsiteWebHelper(WATCH)}
											/>
										</div>
										<VisitICon onClick={() => outsiteWebHelper(DOSTWEBSITE)} />
										<div className="zoom-effect">
											<img
												className="zoom-effect"
												src={ytlogo}
												alt="dost-logo"
												width="38px"
												height="38px"
												style={{ cursor: "pointer" }}
												onClick={() => outsiteWebHelper(YTDOSTV)}
											/>
										</div>
									</div>
								</div>
							</div>
							<div className="body-3-div2-div2">
								<div>
									<img
										className="zoom-effect"
										src={scanmo}
										alt="scanmo-logo"
										style={{ cursor: "pointer" }}
										width={"148"}
										height={"175"}
										onClick={() => outsiteWebHelper(SCANMO)}
									/>
								</div>
								<p style={{ marginTop: "5px", textAlign: "center" }}>
									Leave Feedback. Rate us.
								</p>
							</div>
						</div>
					</div>
				</div>
				<div className="page-two-container-footer">
					<div style={{ color: "white", fontSize: "11px", padding: "10px" }}>
						&#169; 2020 DOST ALL RIGHTS RESERVED
					</div>
				</div>
			</div>
		</React.Fragment>
	);
};

const DostMapComponent = () => {
	return (
		<React.Fragment>
			<div class="mapouter">
				<div class="gmap_canvas">
					<iframe
						width="700"
						height="400"
						id="gmap_canvas"
						src="https://maps.google.com/maps?q=National%20Academy%20of%20Science%20and%20Technology&t=&z=17&ie=UTF8&iwloc=&output=embed"
						frameborder="0"
						scrolling="no"
						marginheight="0"
						marginwidth="0"
					></iframe>
				</div>
			</div>
			<div className="take-a-tour">
				<a
					target={"_blank"}
					href="https://maps.google.com/maps?ll=14.490599,121.050117&z=17&t=m&hl=en-US&gl=US&mapclient=embed&cid=4615072221923205496"
				>
					Take a Tour
				</a>
			</div>
		</React.Fragment>
	);
};

const VisitICon = (onClick) => {
	return (
		<React.Fragment>
			<div className="www-icon" onClick={onClick}>
				<BsGlobe className="zoom-effect" />
				<p style={{ fontSize: "10px", textAlign: "center", marginLeft: "0px" }}>
					www
				</p>
			</div>
		</React.Fragment>
	);
};
