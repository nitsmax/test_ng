export interface Voucher {
    _id: string;
    name: string;
    description: string;
    code: string;
    uselimit: number;
    usedNum: number;
    expireDate: string;
    membershipPlan: string;
    date_created: string;
}