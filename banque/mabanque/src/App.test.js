import { get_account, create_account, delete_account, register_banker ,get_banker, register ,get_user, delete_banker} from './api/UserFunctions';

describe('Test API', () => {

  it('Test the user has been created -- register', async function () {
    await register({firstname: "JohnBob",lastname: "DoeDad",mailadress: "JohnBobDoeDad@gmail.com", passworduser: "0000", adress: "22 rue de Gaulle", phonenumber: "0654523654"});
    console.warn(await get_user(13));
    var data = await get_user(13);
    expect(data.firstname).toBe("JohnBob");
    expect(data.lastname).toBe("DoeDad");
    expect(data.mailadress).toBe("JohnBobDoeDad@gmail.com");    
    expect(data.passworduser).toHaveLength(60);
    expect(data.adress).toBe("22 rue de Gaulle");
    expect(data.phonenumber).toBe("0654523654");    
  });
});

describe('Test account API', () => {
  it('Test the account has been created -- get_account', async function () {
    await create_account({iduser: 13,amount: 250000,accountlimit: 2000});
    console.warn(await get_account(26));
    var data = await get_account(26);
    expect(data.iduser).toEqual(13);
    expect(data.amount).toEqual(250000);
    expect(data.accountlimit).toEqual(2000);
  });

  it('Test the account has been deleted -- delete_account', async function () {
    await delete_account(26);
    console.warn(await get_account(26))
    var data = await get_account(26)
    expect(data.iduser).toBeUndefined();
    expect(data.amount).toBeUndefined();
    expect(data.accountlimit).toBeUndefined();
  });
});

describe('Test Banker API', () => {
  it('Test the Banker has been created -- get_banker', async function () {
    await register_banker({userid: 9, firstname: "test",lastname: "test",mailadress: "test@gmail.com", passwordbanker: "0000" });
    console.warn(await get_banker(6));
    var data = await get_banker(6);
    expect(data.userid).toEqual(9);
    expect(data.firstanme).toBe('test');
    expect(data.lastname).toBe('test');
    expect(data.mailadress).toBe('test@gmail.com');
    expect(data.passwordbanker).toHaveLength(60);
  });

  it('Test the Banker has been deleted -- delete_banker', async function () {
    await delete_banker(6);
    console.warn(await get_banker(6))
    var data = await get_banker(6)
    expect(data.userid).toBeUndefined();
    expect(data.firstanme).toBeUndefined();
    expect(data.lastname).toBeUndefined();    
    expect(data.mailadress).toBeUndefined();
    expect(data.passwordbanker).toBeUndefined();
  });
});

// npm i --save-dev enzyme enzyme-adapter-react-16