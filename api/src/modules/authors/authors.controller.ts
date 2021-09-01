import { Controller, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Crud, CrudController } from '@nestjsx/crud';

import { Roles } from '../../core/Decorators/roles.decorator';
import { Role } from '../../shared/Enums/roles.enum';
import { CreateAuthorDto, UpdateAuthorDto } from './authors.dto';
import { Author } from './authors.entity';
import { AuthorsService } from './authors.service';

@ApiTags('Authors')
@Controller('authors')
@Crud({
  model: { type: Author },
  routes: {
    createOneBase: { decorators: [ApiBearerAuth(), UseGuards(AuthGuard()), Roles(Role.ADMIN)] },
    updateOneBase: { decorators: [ApiBearerAuth(), UseGuards(AuthGuard()), Roles(Role.ADMIN)] },
    deleteOneBase: { decorators: [ApiBearerAuth(), UseGuards(AuthGuard()), Roles(Role.ADMIN)] }
  },
  dto: { create: CreateAuthorDto, update: UpdateAuthorDto }
})
export class AuthorsController implements CrudController<Author> {
  constructor(public service: AuthorsService) {}
}