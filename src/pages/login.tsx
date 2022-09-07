import { Formik } from "formik";
import { TextField } from "@material-ui/core";




const Login = () => {
   
        
        
        <div>
            <Formik
                initialValues={{ firstName: "", lastName: "", email: "" }}
                onSubmit={data => {
                    console.log(data);
                } }>

               

                {({ values, handleChange, handleBlur, handleSubmit }) => (
                    
                        <form onSubmit={handleSubmit}>
                            <TextField
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.firstName} />
                            <TextField
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.lastName} />
                            <TextField
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.email} />
                        </form>
                    )
                }
              
            </Formik>
        </div>
        
    };
    
   export default Login;