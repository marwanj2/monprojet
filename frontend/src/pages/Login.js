import { Link } from "react-router-dom";
import styles from "./style.module.css";
import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import AuthService from "../services/auth.services"

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        !هذه الخانة مطلوبه
      </div>
    );
  }
};

const vphone = (value) => {
	if (value.length !== 8) {
	  return (
		<div className="alert alert-danger" role="alert">
		  .يجب أن يتكون رقم الهاتف من 8 أرقام
		</div>
	  );
	}
  };

const Login = (props) => {
	const form = useRef();
	const checkBtn = useRef();

	const [phone, setPhone] = useState(null);
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const [message, setMessage] = useState("");

	const onChangePhone = (e) => {
	  const phone = e.target.value;
	  setPhone(phone);
	};

	const onChangePassword = (e) => {
	  const password = e.target.value;
	  setPassword(password);
	};

	const handleLogin = (e) => {
	  e.preventDefault();

	  setMessage("");
	  setLoading(true);

	  form.current.validateAll();
		console.log(checkBtn)
	  if (checkBtn.current.context._errors.length === 0) {
		AuthService.login(phone, password).then(
		  (user) => {
			console.log(user);
			if(user.roles.includes("admin")){
				 props.history.push("/admin");
			}
			else{
				props.history.push("/user");
			}//window.location.reload();
		  },
		  (error) => {
			const resMessage =
			  (error.response &&
				error.response.data &&
				error.response.data.message) ||
			  error.message ||
			  error.toString();

			setLoading(false);
			setMessage(resMessage);
		  }
		);
	  } else {
		setLoading(false);
	  }
	};


	return (
		<div className={styles.login_container}>
			<div className={styles.login_form_container}>
				<div className={styles.left}>
					<Form className={styles.form_container} onSubmit={handleLogin} ref={form}>
						<h1>تسجيل الدخول إلى حسابك</h1>
						<Input
							type="number"
							placeholder="رقم الهاتف"
							name="phone"
							required
							className={styles.input}
							onChange={onChangePhone}
							validations={[required, vphone]}
						/>
						<Input
							type="password"
							placeholder="كلمة المرور"
							name="password"
							required
							className={styles.input}
							onChange={onChangePassword}
							validations={[required]}
						/>
						          {message && (
									<div className="form-group">
									<div className="alert alert-danger" role="alert">
										{message}
									</div>
									</div>
								)}
						<CheckButton type="submit" className={styles.green_btn} ref={checkBtn}>
							دخول
						</CheckButton>
					</Form>
				</div>
				<div className={styles.right}>
					<h1>جديد هنا؟</h1>
					<Link to="/signup">
						<button type="button" className={styles.white_btn}>
							سجل
						</button>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Login;