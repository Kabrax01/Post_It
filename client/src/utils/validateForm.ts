import { PostData, ErrorType } from "../entities/types";

// const validateForm = (data: PostData) => {
//     const errors = <ErrorType>{};

//     for (const [key, value] of Object.entries(data)) {
//         if (value === "") {
//             errors[key] = "Required";
//         } else if (value.length < 3) {
//             errors[key] = "Too short";
//         }
//     }

//     console.log(errors);
//     return errors;
// };

const validateForm = (value: string) => {
    if (!value) return "Required";
    if (value.length < 3) return "Too short";
};

export default validateForm;
