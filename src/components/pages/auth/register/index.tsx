const logo  = require("../../../../assets/logo.png");

interface Props {}

export default function Register(props: Props) {
    return (
        <>
            <main className="form-signin w-100 m-auto">
                <form>
                    <img className="mb-4" src={logo} alt="" width="72" height="57" />
                    <h1 className="h3 mb-4 fw-normal">Register</h1>

                    <div className="form-floating form-floating-up">
                        <input type="text" className="form-control" id="floatingName" placeholder="John Doe" />
                        <label htmlFor="floatingName">Name</label>
                    </div>
                    <div className="form-floating">
                        <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" />
                        <label htmlFor="floatingInput">Email address</label>
                    </div>
                    <div className="form-floating">
                        <input type="password" className="form-control" id="floatingPassword" placeholder="Password" />
                        <label htmlFor="floatingPassword">Password</label>
                    </div>
                    <div className="form-floating form-floating-down mb-4">
                        <input type="password" className="form-control" id="floatingPassword" placeholder="Password" />
                        <label htmlFor="floatingPassword">Confirm Password</label>
                    </div>

                    <button className="w-100 btn btn-lg btn-primary" type="submit">Register</button>
                    <p className="mt-5 mb-3 text-muted">&copy; Perpustakaan 2023</p>
                </form>
            </main>
        </>
    )
}