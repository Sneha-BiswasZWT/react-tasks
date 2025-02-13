import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import axios from "axios";
import { toast } from "react-toastify";
import { Context } from "../main";

const CategoryNav = () => {
  const [show, setShow] = useState(false);
  const [categories, setCategories] = useState([]);
  const navigateTo = useNavigate();

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:5000/api/categories"
        );
        setCategories(data.categories);
      } catch (error) {
        toast.error("Failed to load categories");
      }
    };

    fetchCategories();
  }, []);

  return (
    <>
      <nav className="container">
        <div className={show ? "navLinks showmenu" : "navLinks"}>
          <div className="links">
            {categories.length > 0 ? (
              categories.map((category) => (
                <Link
                  key={category.id}
                  to={`/category/${category.id}`}
                  onClick={() => setShow(false)}
                >
                  {category.name}
                </Link>
              ))
            ) : (
              <p>Loading...</p>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default CategoryNav;
