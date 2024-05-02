"use client";

import { redirect, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const withAuth = (Component) => {
	const WithAuth = (props) => {
		const [isLoading, setIsLoading] = useState(true);
		const router = useRouter();

		useEffect(() => {
			const checkAuth = async () => {
				const accessToken = localStorage.getItem("accessToken");
				if (!accessToken) {
					router.push("/auth/login");
					setIsLoading(true);
				} else {
					setIsLoading(false);
				}
			};

			checkAuth();
		}, []);

		if (isLoading) {
			return <div>Loading...</div>;
		}

		return <Component {...props} />;
	};

	return WithAuth;
};

export default withAuth;
