import { Form } from "react-router-dom"

// library
import { UserPlusIcon } from "@heroicons/react/16/solid";

// assets
import illustration from "../assets/illustration.jpg"
const Intro = () => {
    return (
        <div className="intro">
            <div>
                <h1>
                    Take Control of <span className="accent"> Your Money! </span>
                </h1>
                <p>
                    Personal budgeting is important for yourself and your future.
                    Take control today with HomeBudget.
                </p>
                <Form method="post">
                    <input type="test" name="userName" required
                        placeholder="What is your name?"
                        aria-label="Your Name"
                        autoComplete="given-name" />
                    <input type="hidden" name="_action" value="newUser" />
                    <button type="submit" className="btn btn--dark">
                        <span>Create Account</span>
                        <UserPlusIcon width={20} />
                    </button>
                </Form>
            </div>
            <img src={illustration} alt="Person with money" width={500} />
        </div>
    )
}

export default Intro;