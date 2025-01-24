// import { api } from "$lib/api";
// import { config } from "$lib/config";

// export async function load({params, cookies}) {
//   const companyId = params.id;

//   try {
//     const response = await api(config.endpoints.company.getCompany.replace(':id', companyId), {   
//       method: "GET",
//       server: {
//         locals: {
//           token: cookies.get("auth_token")
//         }
//       }
//     });

//     const data = await response.json();

//     console.log("company server layoutdata :: ", data);

//     if(!data.success) {
//       throw new Error(data.message || "Failed to fetch company");
//     }
//     return { company: data.company };
//   } catch (error) {
//     console.error("Error fetching user company:", error);
//   }

//   return { companyId };
// }