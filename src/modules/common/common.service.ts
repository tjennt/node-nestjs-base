import { Injectable } from '@nestjs/common';
import { ResponseDto } from 'src/dto/response.dto';

@Injectable()
export class CommonService {
    successRes(data?: any, message?: string): any {
        const results : ResponseDto = {
            success: true,
            message: message,
            data: data,
        };
        return results;
    }
}
