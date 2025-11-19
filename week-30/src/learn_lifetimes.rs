pub fn learn_lifetimes() {
    let str1 = String::from("Adarsh");
    let ans;
    {
        let str2 = String::from("");
        ans = longest_string(&str1, &str2);
        print!("{}", ans);
    }
        // print!("{}", ans); ans may refer to str2, which doesn't live long enough
        // fix move str2 outside the inner block
}

fn longest_string<'a>(s1: &'a String, s2: &'a String) -> &'a String {
    if s1.len() > s2.len() {
        return s1;
    }

    return s2;
}