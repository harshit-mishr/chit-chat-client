"use client";
import { Button, Card, Image, Typography } from "antd";
import apiService from "@/service/apiService";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import withAuth from "@/utils/authentication/withAuth";
import styles from "./page.module.css";
const { Title, Text } = Typography;

function Home() {
	const [userData, setUserData] = useState(null);
	const router = useRouter();

	const getUserData = async () => {
		try {
			const response = await apiService.get("/user", false);
			console.log("response", response);
			setUserData(response.data);
		} catch (error) {
			console.error("Error:", error);
		}
	};

	useEffect(() => {
		getUserData();
	}, []);

	const logout = async () => {
		try {
			const refreshToken = localStorage.getItem("refreshToken");
			const response = await apiService.post(
				"/auth/logout",
				{ refreshToken },
				false,
			);
			console.log("response", response);
			localStorage.removeItem("accessToken");
			localStorage.removeItem("refreshToken");
			router.push("/auth/login");
		} catch (error) {
			console.error("Error:", error);
		}
	};

	return (
		<Card className={styles.home_card}>
			<Title level={2}>Home</Title>
			<Button onClick={getUserData} className={styles.button}>
				Get User Data
			</Button>
			<Button onClick={logout} className={styles.button}>
				Logout
			</Button>
			<hr />
			{userData && (
				<div className={styles.user_data}>
					<Title level={4}>{userData?.username}</Title>
					<Text>{userData?.email}</Text>
					<br />
					<div>
						<Image
							src={userData?.profilePicture}
							alt='profile'
							width={300}
							height={300}
						/>
					</div>
				</div>
			)}
		</Card>
	);
}

export default withAuth(Home);
