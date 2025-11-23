use solana_program::{
    account_info::{AccountInfo, next_account_info},
    entrypoint,
    entrypoint::ProgramResult,
    pubkey::Pubkey,
    instruction::{Instruction, AccountMeta},
    program::invoke,
};

entrypoint!(process_instruction);

pub fn process_instruction(
    _program_id: &Pubkey,
    accounts: &[AccountInfo],
    _instruction_data: &[u8]
) -> ProgramResult {
    let accounts_iter = &mut accounts.iter();

    let data_account = next_account_info(accounts_iter)?;
    let double_contract_address = next_account_info(accounts_iter)?;

    // Build CPI instruction
    let instruction = Instruction {
        program_id: *double_contract_address.key,
        accounts: vec![
            AccountMeta::new(*data_account.key, true),
        ],
        data: vec![],
    };

    invoke(&instruction, &[data_account.clone()])?;

    Ok(())
}
