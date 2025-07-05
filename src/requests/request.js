export const validate = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body, { abortEarly: false });
        
        if (error) {
            const errors = {};
            
            error.details.forEach(detail => {
                const fieldName = detail.path.join('.');
                
                if (!errors[fieldName]) {
                    errors[fieldName] = [];
                }
                
                errors[fieldName].push(detail.message);
            });
            
            return res.status(422).json({
                message: "The given data was invalid.",
                errors: errors
            });
        }
        
        next();
    };
};