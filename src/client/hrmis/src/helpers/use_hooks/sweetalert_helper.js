import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const useSweetAlertHelper = () => {
	let MySwal = withReactContent(Swal);

	const useSwal = (title, body, icon) => {
		Swal.fire(title, body, icon);
	};

	const sweetAlertConfirm = (
		title,
		html,
		icon,
		showCancelButton,
		preConfirm,
		confirmCallback
	) => {
		MySwal.fire({
			title: <span>{title}</span>,
			html: html,
			icon: icon,
			showCancelButton: showCancelButton,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "OK",
			preConfirm: () => {
				return preConfirm();
			},
		}).then((result) => {
			if (result.isConfirmed) {
				confirmCallback();
			} else if (
				result.dismiss === Swal.DismissReason.cancel ||
				result.dismiss === Swal.DismissReason.close ||
				result.dismiss === Swal.DismissReason.esc // ||
				//                    result.dismiss === Swal.DismissReason.backdrop
			) {
				//do nothing
			}
		});
	};

	const toastSuccessFailMessage = (response) => {
		const Toast = Swal.mixin({
			toast: true,
			position: "top-end",
			showConfirmButton: false,
			showCloseButton: true,
			timer: 2000,
			timerProgressBar: true,
			didOpen: (toast) => {
				toast.addEventListener("mouseenter", Swal.stopTimer);
				toast.addEventListener("mouseleave", Swal.resumeTimer);
			},
		});

		Toast.fire({
			icon: response.code === 200 ? "success" : "error",
			title: response.message,
		});
	};

	return { useSwal, sweetAlertConfirm, toastSuccessFailMessage };
};

export default useSweetAlertHelper;
