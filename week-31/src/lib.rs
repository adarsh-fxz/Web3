use borsh::{BorshDeserialize, BorshSerialize};
use solana_program::{
    account_info::{AccountInfo, next_account_info},
    entrypoint,
    entrypoint::ProgramResult,
    msg,
    pubkey::Pubkey,
};

#[derive(BorshDeserialize, BorshSerialize)]
enum InstructionType {
    Increment(u32),
    Decrement(u32),
}

#[derive(BorshDeserialize, BorshSerialize)]
struct Counter {
    count: u32,
}

entrypoint!(counter_contract);

pub fn counter_contract(
    program_id: &Pubkey,
    accounts: &[AccountInfo],
    instruction_data: &[u8],
) -> ProgramResult {
    let account = next_account_info(&mut accounts.iter())?;
    let mut counter = Counter::try_from_slice(&account.data.borrow())?;

    match InstructionType::try_from_slice(instruction_data)? {
        InstructionType::Increment(amount) => {
            counter.count += amount;
        }
        InstructionType::Decrement(amount) => {
            counter.count -= amount;
        }
    }

    let _ = counter.serialize(&mut *account.data.borrow_mut());
    msg!("Counter update to {}", counter.count);

    Ok(())
}
