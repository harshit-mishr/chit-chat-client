"use client";

import { redirect } from "next/navigation";
import React, { useEffect } from "react";

const withAuth = (Component) => {
	return function WithAuth(props) {
		useEffect(() => {
			if (!localStorage.getItem("accessToken")) {
				redirect("/auth/login");
			}
		}, []);

		return <Component {...props} />;
	};
};

export default withAuth;
