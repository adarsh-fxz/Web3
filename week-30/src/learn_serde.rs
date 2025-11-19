use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Debug)]

struct Person {
    name: String,
    age: u32,
}

pub fn learn_serde() {
    let person = Person {
        name: String::from("Adarsh Gupta"),
        age: 21,
    };

    // Serialize to JSON
    let json_str = serde_json::to_string(&person).unwrap();
    println!("Serialized JSON: {}", json_str);

    // Deserialize from JSON
    let deserialized_person: Person = serde_json::from_str(&json_str).unwrap();
    println!("Deserialized Person: {:?}", deserialized_person);
}