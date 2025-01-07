import { PostData } from "../entities/types";

const validateForm = (data: PostData) => {
    const errors = <{ [key: string]: string }>{};

    for (const [key, value] of Object.entries(data)) {
        if (value === "") {
            errors[key] = "empty";
        } else if (value.length < 3) {
            errors[key] = "short";
        }
    }

    return errors;
};

export default validateForm;
