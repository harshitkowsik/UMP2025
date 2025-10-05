function Footer() {
    return (
      <footer className="bg-light text-center py-3 mt-5">
        <div className="container">
          <small>
            &copy; {new Date().getFullYear()} GovDocShare. All rights reserved.
          </small>
        </div>
      </footer>
    );
  }
  
  export default Footer;
  