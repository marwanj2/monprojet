import styles from "./styles.module.css";
import { Link } from "react-router-dom";
import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import AuthService from "../services/auth.services"

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        يجب عليك تعمير الخانة
      </div>
    );
  }
};

const vphone = (value) => {
	if (value.length !== 8) {
	  return (
		<div className="alert alert-danger" role="alert">
		  .يجب أن يكون رقم الهاتف 8 أرقام
		</div>
	  );
	}
  };


const vname = (value) => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        .يجب أن يكون الاسم بين 3 و 20 حرفًا
      </div>
    );
  }
};

const vpassword = (value) => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        .يجب أن تكون كلمة المرور بين 6 و 40 حرفًا
      </div>
    );
  }
};

const SignUp = (props) =>{
	const form = useRef();
	const checkBtn = useRef();
	const [type, setType] = useState("citoyen");
	const [firstname, setfirstName] = useState("");
	const [lastname, setlastName] = useState("");
	const [password, setPassword] = useState("");
	const [phone, setPhone] = useState(null);
	const [successful, setSuccessful] = useState(false);
	const [message, setMessage] = useState("");

	const onChangefirstName = (e) => {
	  const firstname = e.target.value;
	  setfirstName(firstname.trim());
	};

	const onChangelastName = (e) => {
		const lastname = e.target.value;
		setlastName(lastname.trim());
	  };

	const onChangePhone = (e) => {
		const phone = e.target.value;
		setPhone(phone);
	  };


	const onChangePassword = (e) => {
	  const password = e.target.value;
	  setPassword(password);
	};

	const handleRegister = (e) => {
	  e.preventDefault();

	  setMessage("");
	  setSuccessful(false);

	  form.current.validateAll();

	  if (checkBtn.current.context._errors.length === 0) {
		AuthService.register(firstname,lastname, phone, type, password).then(
		  (response) => {
			setMessage(response.data.message);
			setSuccessful(true);
		  },
		  (error) => {
			const resMessage =
			  (error.response &&
				error.response.data &&
				error.response.data.message) ||
			  error.message ||
			  error.toString();

			setMessage(resMessage);
			setSuccessful(false);
		  }
		);
	  }
	};
	return (
		<div className={styles.signup_container}>
			<div className={styles.signup_form_container}>
				<div className={styles.left}>
					<h1>مرحبا</h1>
					<Link to="/login">
						<button type="button" className={styles.white_btn}>
							دخول
						</button>
					</Link>
				</div>
				<div className={styles.right}>
					<Form className={styles.form_container} onSubmit={handleRegister} ref={form}>
						<h1>إصنع حساب</h1>
						<Input
							type="text"
							placeholder="الاسم"
							name="firstname"
							required
							className={styles.input}
							onChange={onChangefirstName}
							validations={[required, vname]}
						/>
						<Input
							type="text"
							placeholder="اللقب"
							name="lastname"
							required
							className={styles.input}
							onChange={onChangelastName}
							validations={[required, vname]}
						/>
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
							className={styles.input}
							onChange ={onChangePassword}
							validations={[required, vpassword]}

						/>
						<select className={styles.input} name="type"  value ={type} onChange={(e) => setType(e.target.value)}>
							<option value="citoyen">مواطن</option>
							<option value="ouvrier">عامل نظافة</option>
						</select>
						{message && (
							<div className="form-group">
								<div className={
									successful ? "alert alert-success" : "alert alert-danger"
								}
								role="alert"
								>
							{message}
							</div>
						</div>
						)}

						<CheckButton type="submit" className={styles.green_btn} ref={checkBtn}>
							تسجيل
						</CheckButton>
					</Form>
				</div>
			</div>
		</div>
	);
  }

export default SignUp;