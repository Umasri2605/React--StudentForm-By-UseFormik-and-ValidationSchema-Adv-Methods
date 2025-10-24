import { useFormik } from "formik"
import React from "react"
import * as yup from 'yup';

function StudentForm() {
  const[submitdata,SetSubmitData]=React.useState([]);
  const studentForm = useFormik({
    initialValues: {
      FirstName: "",
      LastName: "",
      Password: "",
      Gender: "",
      Age: 0,
      Techs: "",
      Country: ""
    },

    validationSchema: yup.object({
      FirstName: yup.string().required("FirstName is Mandatory"),
      Gender: yup.string().required(),
      LastName: yup.string().required().test("checkmax7","max 7 letters",(value,context)=>{
        // console.log(value);
        // console.log(context);
        if(value.length ==7){
          return true;
        }
      }),
      Password:yup.string().required().matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,16}$/,{message:"Hi"})
    }),
    Age:yup.string().test("checkage","Not Eligible",(value,context)=>{
      var reg=/^\d+$/;
      if(reg.test(value)){
        if(context.parent.Gender=="Male" && value==25){
          return true;
        }
        if(context.parent.Gender=="Female" && value==21){
          return true;
        }
        else{
          return false; 
        }
      }
    }),
    onSubmit: (values) => {
      SetSubmitData([...submitdata,values]);
    }
  })
  return (
    <div className="border border-2 border-danger-subtle p-3 m-3">
      <h1>Student Form Here:</h1>
      <p>{JSON.stringify(studentForm.errors)}</p>  
      {/* <p>{JSON.stringify(studentForm.touched)}</p> */}
      <form onSubmit={studentForm.handleSubmit}>

        <b>FirstName:</b>
        <input type="text"  name="FirstName" onChange={studentForm.handleChange} onBlur={studentForm.handleBlur}/>
        <>{studentForm.touched.FirstName && studentForm.errors.FirstName && (<div>FirstName is Mandatory</div>)}</>
        <>{studentForm.errors.FirstName && (<div>Must be 3 Characters</div>)}</>
        <br></br>
        <br></br>

        <b>LastName:</b>
        <input type="text" name="LastName" onChange={studentForm.handleChange} onBlur={studentForm.handleBlur} />
        <>{studentForm.errors.LastName && (<div>Max 5 Alhabets</div>)}</>
        <br></br>
        <br></br>

        <b>Password</b>
        <input type="Password" name="Password" onChange={studentForm.handleChange} onBlur={studentForm.handleBlur} />
        <br></br>
        <br></br>

        <b>Gender:</b>
        <input type="radio" name="Gender" value="Male" onChange={studentForm.handleChange} />Male
        <input type="radio" name="Gender" value="Female" onChange={studentForm.handleChange} />Female
        <input type="radio" name="Gender" value="Others" onChange={studentForm.handleChange} />Others
        {studentForm.errors.Gender && (<div>Please Select the Gneder</div>)}
        <br></br>
        <br></br>

        <b>Age:</b>
        <input type="text" name="Age" onChange={studentForm.handleChange}  onBlur={studentForm.handleBlur} />
        <br></br>
        <br></br>

        <b>Technologies:</b>
        <input type="checkbox" name="Techs" value="HTML" onChange={studentForm.handleChange} />:HTML
        <input type="checkbox" name="Techs" value="CSS" onChange={studentForm.handleChange} />:CSS
        <input type="checkbox" name="Techs" value="Javascript" onChange={studentForm.handleChange} />:Javascript
        <input type="checkbox" name="Techs" value="ReactJs" onChange={studentForm.handleChange} />:ReactJs
        <input type="checkbox" name="Techs" value="Angular" onChange={studentForm.handleChange} />:Angular
        <input type="checkbox" name="Techs" value="MernStack" onChange={studentForm.handleChange} />:MernStack
        <input type="checkbox" name="Techs" value="Bootstrap" onChange={studentForm.handleChange} />:Bootstrap
        <br></br>
        <br></br>

        <b>Country:</b>
        <select name="Country" onChange={studentForm.handleChange} >
          <option default value="">Select your Country</option>
          <option value="India">INDIA</option>
          <option value="Usa">USA</option>
          <option value="Uk">UK</option>
          <option value="Canada">Canada</option>
          <option value="Australia">Australia</option>
        </select>
        <br></br>
        <br></br>

        <button type="submit" className="btn bg-info-subtle border-info-subtle me-3">Show Data</button>
        <button onClick={() => (studentForm.resetForm())} type="reset" className="btn bg-warning-subtle border-warning-subtle">ClearForm</button>
      </form>
      <table className="table table-border">
             <thead>
               <tr>
                 <th>Firstname</th>
                 <th>Lastname</th>
                 <th>Password</th>
                 <th>Gender</th>
                 <th>Age</th>
                 <th>Techs</th>
                 <th>Country</th>
               </tr>
             </thead>
              <tbody>
                 {submitdata.map((data) => (
                  <tr>
                  <td>{data.FirstName}</td>
                  <td>{data.LastName}</td>
                  <td>{data.Password}</td>
                  <td>{data.Gender}</td>
                  <td>{data.Age}</td>
                  <td>{data.Techs}</td> 
                  <td>{data.Country}</td>
                  </tr>
              ))}
            </tbody>
          </table>
    </div>
  )
}
  export default StudentForm