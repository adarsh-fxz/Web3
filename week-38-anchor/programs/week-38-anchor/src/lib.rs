use anchor_lang::prelude::*;

declare_id!("HshsVx4KFHEG1C9eAv9WNykn1FZegg2A4FDUs9ndsTxE");

#[program]
pub mod week_38_anchor {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        msg!("Greetings from: {:?}", ctx.program_id);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
