import {ratelimit} from "@repo/security";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
	const body = await request.json() as {username: string};

	const identifier = body.username;

	const {success, limit, remaining} = await ratelimit.limit(identifier)

	const response = {
		success,
		limit,
		remaining
	}

	if (!success){
		return new Response(JSON.stringify(response), {status: 429});
	}

	return new Response(JSON.stringify(response), {status: 200});	
}