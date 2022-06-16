import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const useSweetAlertHelper = () => {
	let MySwal = withReactContent(Swal);

	const simpleSwal = (title, body, icon) => {
		Swal.fire(title, body, icon);
	};

	const sweetAlertConfirm = (
		title,
		html,
		icon,
		preConfirmCallback,
		confirmCallback,
		cancelCallback,
		showCancelButton = true,
		confirmButtonText = "OK",
		cancelButtonColor = "#d33",
		cancelButtonText = "Cancel"
	) => {
		MySwal.fire({
			title: <span>{title}</span>,
			html: <i>{html}</i>,
			icon: icon,
			showCloseButton: true,
			showCancelButton: showCancelButton,
			confirmButtonColor: "#3085d6",
			confirmButtonText: confirmButtonText,
			cancelButtonColor: cancelButtonColor,
			cancelButtonText: cancelButtonText,
			preConfirm: () => {
				return preConfirmCallback();
			},
		}).then((result) => {
			if (result.isConfirmed) {
				confirmCallback();
			} else if (
				result.dismiss === Swal.DismissReason.cancel
				// ||
				// result.dismiss === Swal.DismissReason.close ||
				// result.dismiss === Swal.DismissReason.esc // ||
				//  result.dismiss === Swal.DismissReason.backdrop
			) {
				cancelCallback();
			}
		});
	};

	const toastSuccessFailMessage = (response, position = "top-end") => {
		const Toast = Swal.mixin({
			toast: true,
			position: position,
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

	return { simpleSwal, sweetAlertConfirm, toastSuccessFailMessage };
};

export default useSweetAlertHelper;
