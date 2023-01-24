import { Controller, Get, Inject } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { TariffMapper } from '../../domain/ports/tariff.mapper';
import { TariffRepository } from '../../domain/ports/tariff.repository';

@Controller('tariffs')
@ApiTags('Tariff endpoints')
export class TariffController {
  @Inject(TariffRepository)
  private readonly tariffRepository: TariffRepository;

  @Get()
  @ApiResponse({
    description: 'Return actives tariffs',
  })
  async getAllTariffs() {
    const tariffs = await this.tariffRepository.findMany();
    return TariffMapper.manyToOutput(tariffs);
  }
}
