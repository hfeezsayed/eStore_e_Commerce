import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, fireDB } from "../../firebase/FirebaseConfig";
import myContext from "../../context/data/myContext";
import { toast } from "react-toastify";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import Loader from "../../components/loader/Loader";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const context = useContext(myContext);
  const { loading, setLoading } = context;

  const signup = async () => {
    setLoading(true);
    if (name === "" || email === "" || password === "") {
      toast.error("All fields are required");
    }
    try {
      const users = await createUserWithEmailAndPassword(auth, email, password);
      console.log(users);
      const user = {
        name: name,
        uid: users.user.uid,
        email: users.user.email,
        time: Timestamp.now(),
      };

      const userRef = collection(fireDB, "user");
      await addDoc(userRef, user);
      toast.success("Signup Successfully");
      setName("");
      setEmail("");
      setPassword("");
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div className=" flex justify-center items-center h-screen">
      {loading && <Loader />}
      <div className=" bg-gray-800 px-10 py-10 rounded-xl ">
        <div className="">
          <h1 className="text-center text-white text-xl mb-4 font-bold">
            Signup
          </h1>
        </div>
        <div>
          <input
            type="text"
            name="name"
            value={name}
            className=" bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none"
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div>
          <input
            type="email"
            name="email"
            value={email}
            className=" bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <input
            type="password"
            name="password"
            value={password}
            className=" bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className=" flex justify-center mb-3">
          <button
            className=" bg-red-500 w-full text-white font-bold  px-2 py-2 rounded-lg"
            onClick={signup}
          >
            Signup
          </button>
        </div>
        <div>
          <h2 className="text-white">
            Have an account{" "}
            <Link className=" text-red-500 font-bold" to={"/login"}>
              Login
            </Link>
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Signup;
