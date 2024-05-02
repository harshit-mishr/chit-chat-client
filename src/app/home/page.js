"use client";
import withAuth from "@/utils/authentication/withAuth";
import React from "react";

function Home() {
	return (
		<div>
			<p>Home</p>
		</div>
	);
}

export default withAuth(Home);
