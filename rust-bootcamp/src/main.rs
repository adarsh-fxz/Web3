fn main() {
    let ans = sum(1, 2);
    println!("{}", ans);

    let _name = String::from("Adarsh");
    println!("First name: {}", _name);

    let arr = [1, 2, 3, 4, 5];
    println!("{:?}", arr);

    let v = vec![1, 2, 3];
    println!("{:?}", v);

    let x = 99;
    let is_even = is_even(x);
    if is_even {
        println!("{} is even", x);
    } else {
        println!("{} is odd", x);
    }

    for i in 0..100 {
        print!("{}", i);
    }

    let mut name = String::from("Adarsh");
    name.push_str(" Gupta");
    println!("{}", name);

    let _name1 = String::from("Adarsh");
    let (len, _name1) = get_len(_name1);
    println!("{}", len);
    println!("{}", _name1);
}

fn get_len(s: String) -> (usize, String) {
    return (s.len(), s);
}

fn sum(a: u32, b: u32) -> u32 {
    return a + b;
}

pub fn is_even(x: i32) -> bool {
    return x % 2 == 0;
}
