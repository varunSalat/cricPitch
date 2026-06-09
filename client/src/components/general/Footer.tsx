const Footer = () => {
  return (
    <footer className="border-t py-6">
      <p className="text-center text-sm text-muted-foreground">
        &copy; {new Date().getFullYear()} CricPitch. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
